const { expect } = require('chai');
const sinon = require('sinon');
const { getSaleById } = require('../../../models/salesModel');

const salesServices = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

describe("Service Layer test - addSales services", () => {
  describe("When productId do not exist", () => {
    const sales = [
      {
        quantity: 1,
      },
    ];
  });

  describe("Test getSales function", () => {
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
      await sinon.stub(salesModel, "getSales").resolves(payload);
    });

    afterEach(async () => {
      await salesModel.getSales.restore();
    });

    it("should return an array", async () => {
      const result = await salesServices.getSales();
      expect(result).to.be.an("array");
    });

    it("should return an array with length 2", async () => {
      const result = await salesServices.getSales();
      expect(result).to.deep.equal([
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
      ]);
    });
  });

  describe("Test getSaleById function", () => {
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
      await sinon.stub(salesModel, "getSaleById").resolves(payload);
    });

    afterEach(async () => {
      await salesModel.getSaleById.restore();
    });

    it("should return an array", async () => {
      const result = await salesServices.getSaleById(1);
      expect(result).to.be.an("array");
    });

    it("should an array lenght without salesId", async () => {
      const result = await salesServices.getSaleById(1);
      expect(result).to.deep.equal([
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
      ]);
    });
  });
})
