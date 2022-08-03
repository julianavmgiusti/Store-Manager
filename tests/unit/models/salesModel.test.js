const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../db/connection');

describe("Model Layer test -  salesModel", () => {
  describe("test addSales function", () => {
    const result = [{ insertId: 1 }];

    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(result);
    });

    afterEach(async () => {
      await connection.execute.restore();
    });
  });

  describe("test addSaleProducts", () => {
    const saleProduct = [{ insertId: 1 }];

    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(saleProduct);
    });

    afterEach(async () => {
      await connection.execute.restore();
    });

    it("should be a object", async () => {
      const result = await salesModel.addSaleProduct(1, 1, 1);
      expect(result).to.be.an("object");
    });
  });

  describe("test getSales", () => {
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
      await sinon.stub(connection, "execute").resolves(payload);
    });

    afterEach(async () => {
      await connection.execute.restore();
    });

    it("should be return a object", async () => {
      const result = await salesModel.getSales();
      expect(result).to.be.an("object");
    });
  });

  describe("test getByID", () => {
    const payload = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
    ];

    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(payload);
    });

    afterEach(async () => {
      await connection.execute.restore();
    });

    it("should return an object", async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.be.an("object");
    });
  });
});
