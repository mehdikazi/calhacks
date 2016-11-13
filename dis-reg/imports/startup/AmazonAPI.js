import { HTTP } from 'meteor/http';
import { jQuery } from 'meteor/jquery';

class Amazon {
	constructor(){
		this.access = 'AKIAJNH2NYYWF7GSCYVA';
		this.url = 'http://webservices.amazon.com/onca/xml';
		this.CryptoJS = require("crypto-js");
	}

	getProductDetails(ASIN){
		// Returns an object with the details of the given product

		const rg = encodeURIComponent('ResponseGroup=Images,Reviews,SalesRank,ItemAttributes,Offers');
		const at = 'AssociateTag=';
		const s = encodeURIComponent('Service=AWSECommerceService');
		const op = encodeURIComponent('Operation=ItemLookup');
		const iid = encodeURIComponent('ItemId='+ASIN);
		const time = getTimestamp();
		const ts = encodeURIComponent('Timestamp='+time);
		const aws = encodeURIComponent('AWSAccessKeyID='+this.access);

		var a = [rg, at, s, op, iid, ts, aws];
		a.sort(); 
		var b = a.join('&');

		var stringToSign = 'GET\nwebservices.amazon.com\n/onca/xml\n'+b;
		var hash = this.CryptoJS.HmacSHA256(stringToSign, 'MEn3IS3F0j1bVgbH3yMgv53HR6uaMdhQgOsRooYl');
		var hashInBase64 = this.CryptoJS.enc.Base64.stringify(hash);
		// ^ following http://docs.aws.amazon.com/AWSECommerceService/latest/DG/rest-signature.html

		var params = {Service: 'AWSECommerceService',
			AWSAccessKeyID: this.access, 
			Operation: 'ItemLookup', // lookup not search
			ItemId: ASIN, // item looking up
			ResponseGroup: encodeURIComponent('Images,Reviews,SalesRank,ItemAttributes,Offers'), //dictates response info
			Timestamp: time, // required for signature
			Signature: hashInBase64, // required (I think?) (for security purposes)
		};

		var out = HTTP.call('GET', this.url, params=params); //results should be returned in XML format

		var xml = jQuery.parseXML(out);

		// photo called 'mediumImage' under 'Images' tag
		var photo = xml.getElementsByTagName("MediumImage");
		// name called 'title' and category called 'ProductGroup' under 'ItemAttributes' tag
		var prod_name = xml.getElementsByTagName("Title");
		// price called 'formattedPrice' under 'Offers' tag
		var price = xml.getElementsByTagName("FormattedPrice");
		// I-frame for reviews under 'Reviews' tag
		var reviews = xml.getElementsByTagName("IFrameURL");
		// Sales rank self explanatory
		var rank = xml.getElementsByTagName("SalesRank");
		// Find all attributed here: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/CHAP_ResponseGroupsList.html

		return {photo: photo, prod_name:prod_name, price, price; reviews:reviews, rank:rank};
	}

	getTimestamp(){
		var d = new Date();
		return d.toISOString();
	}
}