export {};
const express = require("express");
const easy_post_api = require("@easypost/api");

const router = express.Router();

router.post("/create_label", async (req: any, res: any) => {
  try {
    const EasyPost = new easy_post_api(
      "EZTKe960473ffce6480398abda7c6bbc7e1atDCqKdoMD20IwpRa5BqEiQ"
    );
    const order = req.body.formInput;

    const toAddress = new EasyPost.Address({
      name: order.recipentFirstName + " " + order.recipentLastName,
      street1: order.address1,
      street2: order.address2,
      city: order.city,
      state: order.state,
      zip: order.postalCode,
      country: order.country,
    });

    const fromAddress = new EasyPost.Address({
      street1: "417 MONTGOMERY ST",
      street2: "FLOOR 5",
      city: "SAN FRANCISCO",
      state: "CA",
      zip: "94104",
      country: "US",
      company: "EasyPost",
      phone: "415-123-4567",
      async: true,
    });

    const parcel = new EasyPost.Parcel({
      length: parseInt(order.length),
      width: parseInt(order.width),
      height: parseInt(order.height),
      weight: parseInt(order.weight),
    });
    const shipment = new EasyPost.Shipment({
      to_address: toAddress,
      from_address: fromAddress,
      parcel: parcel,
    });
    const saved_shipment = await shipment.save();
    const created_shipment = await EasyPost.Shipment.retrieve(
      saved_shipment.id
    );
    const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
    res.send(label);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Something broke!");
  }
});

export default router;
