export {};
const express = require('express');
const easy_post_api = require('@easypost/api');

const router = express.Router();

router.post('/create_label', async (req: any, res: any) => {
    console.log('in order_routes.ts');
    try {
        const EasyPost = new easy_post_api('EZTKe960473ffce6480398abda7c6bbc7e1atDCqKdoMD20IwpRa5BqEiQ');
        const order = req.body.order;

        console.log('body', req.body);

        // const toAddress = new EasyPost.Address({
        //   name: order.shipping.first_name + " " + order.shipping.last_name,
        //   street1: order.shipping.address_1,
        //   street2: order.shipping.address_2,
        //   city: order.shipping.city,
        //   state: order.shipping.state,
        //   zip: order.shipping.postalCode,
        //   country: order.shipping.country,
        // });

        const toAddress = new EasyPost.Address({
            name: 'Novia Lim',
            street1: '404 Kenniston Dr',
            street2: 'Apt D',
            city: 'California',
            state: 'TX',
            zip: '78752',
            country: 'United States'
        });

        const fromAddress = new EasyPost.Address({
            street1: '417 MONTGOMERY ST',
            street2: 'FLOOR 5',
            city: 'SAN FRANCISCO',
            state: 'CA',
            zip: '94104',
            country: 'US',
            company: 'EasyPost',
            phone: '415-123-4567',
            async: true
        });
        // const cube_root_volume = Math.cbrt(
        //   order.orderItems.reduce((a: any, c: string | any[]) => a + c.length, 0) *
        //     order.orderItems.reduce((a: any, c: { width: any }) => a + c.width, 0) *
        //     order.orderItems.reduce((a: any, c: { height: any }) => a + c.height, 0)
        // );
        const parcel = new EasyPost.Parcel({
            length: 9,
            width: 6,
            height: 2,
            weight: 10
            // length: cube_root_volume,
            // width: cube_root_volume,
            // height: cube_root_volume,
            // weight: order.orderItems.reduce(
            //   (a: any, c: { weight_pounds: any; weight_ounces: number }) =>
            //     c.weight_pounds * 16 + c.weight_ounces + a,
            //   0
            // ),
        });
        const shipment = new EasyPost.Shipment({
            to_address: toAddress,
            from_address: fromAddress,
            parcel: parcel
        });
        const saved_shipment = await shipment.save();
        const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);
        const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
        console.log('label', label.postage_label.label_url);
        res.send(label);
    } catch (err) {
        console.log(err);
    }
});

export default router;
