const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../db/connection");
const productsModel = require("../../../models/productsModel");

describe("Model layer test - if get all products", () => {
  const products = [
    {
      id: 1,
      name: "Martelo de Thor",
    },
    {
      id: 2,
      name: "Traje de encolhimento",
    },
    {
      id: 3,
      name: "Escudo do Capitão América",
    },
  ];

  before(async () => {
    sinon.stub(connection, "execute").resolves([products]);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Test respone of db connection", () => {
    it("should return an array", async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an("array");
    });
  });

  describe("Test the fuction registerNewProducts", () => {
    it("should return an array", async () => {
      const result = await productsModel.registerNewProduct(products);
      expect(result).to.be.an("object");
    });

    it("should return two propertys", async () => {
      const result = await productsModel.registerNewProduct("Primeiro produto");
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
    });
  });
});
