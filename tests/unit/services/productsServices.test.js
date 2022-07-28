const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require("../../../models/productsModel");
const productsServices = require("../../../services/productsServices");

describe("Service layer test - list of db connection", () => {
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
    sinon.stub(productsModel, "getAll").returns(products);
    sinon.stub(productsModel, "getById").returns(products);
  });

  after(async () => {
    productsModel.getAll.restore();
  })

  describe("Test the return of list db connection", () => {
    it("should return an array", async () => {
      const result = await productsServices.getAll();
      expect(result).to.be.an('array');
    });

    it("Should return an product by id", async () => {
      const result = await productsServices.getById(1);
      expect(result).to.be.an('object');
    });
  });
});
