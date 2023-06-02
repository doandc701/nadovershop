import * as dotenv from "dotenv";
dotenv.config();
import { OnePayInternational, VNPay } from 'vn-payments';
import config from 'config';
import querystring from 'qs'
import crypto from 'crypto'
import moment from 'moment'
import ip from 'ip'


const onepayIntl = new OnePayInternational({
    paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
    merchant: 'TESTONEPAY',
    accessCode: '6BEB2546',
    secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
});
let Obj = {}
const getData = (object) => {
    Obj = object
    return object
}

const getPayment = async (req, res) => {
    // const kk = await getData
    console.log(Obj)
    // res.send("Sorry!");
    try {
        res.render("payment/", {
            payment: Obj
        });
    } catch (e) {
        res.send("Sorry!");
    }
}

const getPaymentCallback = (req, res) => {
    const query = req.query;

    onepayIntl.verifyReturnUrl(query).then(results => {
        res.json(results)
        // if (results.isSucceed) {
        //     res.json(results)
        //     // res.render('success', {
        //     //     title: 'Nau Store - Thank You',
        //     //     orderId: results.orderId,
        //     //     price: results.price,
        //     //     message: results.message,
        //     // });
        // } else {
        //     // res.render('errors', {
        //     //     title: 'Nau Store - Payment Errors',
        //     //     message: results.message,
        //     // });
        // }
    });

}

const postPayment = async (req, res) => {
    console.log('req.body.amount', req.body.amount.replace(',', ''))
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    // let ipAddr = req.headers['x-forwarded-for'] ||
    //     req.connection.remoteAddress ||
    //     req.socket.remoteAddress ||
    //     req.connection.socket.remoteAddress;
    let ipAddr = ip.address() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount.replace(',', '');
    let bankCode = req.body.bankCode;
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = process.env.VNP_RETURNURL;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    console.log('vnp_Params', vnp_Params)
    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);

    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    process.env.VNP_URL += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log('process.env.VNP_URL', process.env.VNP_URL)
    res.redirect(process.env.VNP_URL)

}

const getPaymentReturn = (req, res) => {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
    } else {
        res.render('success', { code: '97' })
    }
}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export {
    getData,
    getPayment,
    getPaymentCallback,
    getPaymentReturn,
    postPayment,
}