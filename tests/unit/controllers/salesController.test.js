const { expect } = require("chai");
const sinon = require("sinon");

const salesServices = require("../../../services/salesServices");
const salesController = require("../../../controllers/salesController");

describe("Controller Layer test - addSalescontroller", () => {
  const res = {};
  const req = {};
  const next = () => {};

  const payload = {
    id: 1,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
    ],
  };

  beforeEach(async () => {
    req.body = [
      {
        productId: 1,
        quantity: 1,
      },
    ];
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await sinon.stub(salesServices, "addSales").resolves(payload);
  });

  afterEach(async () => {
    await salesServices.addSales.restore();
  });
});

describe("Test getSales function", () => {
  const req = {};
  const res = {};
  const next = () => {};

  const payload = [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2,
    },
  ];

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await sinon.stub(salesServices, "getSales").resolves(payload);
  });

  afterEach(async () => {
    await salesServices.getSales.restore();
  });

  it("should return status code 200", async () => {
    await salesController.getSales(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
  });
});

describe("Test getSaleById function", () => {
  const req = {};
  const res = {};
  const next = () => {};

  const payload = [
    {
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
    {
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2,
    },
  ];

  beforeEach(async () => {
    req.params = "1";
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await sinon.stub(salesServices, "getSaleById").resolves(payload);
  });

  afterEach(async () => {
    await salesServices.getSaleById.restore();
  });

  it("should return status code 200", async () => {
    await salesController.getSaleById(req, res, next);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
});
