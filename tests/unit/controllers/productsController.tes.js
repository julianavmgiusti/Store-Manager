const sinon = require("sinon");
const { expect } = require("chai");

const productsServices = require("../../../services/productsServices");
const productsController = require("../../../controllers/productsController");

describe('Controller layer test', () => {
  describe('Test the called of the getAll', () => {
    describe('Test the response', async () => {
      const response = {};
      const request = {};
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
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(products);

        sinon.stub(productsServices, "getAll").resolves(products);
      })

      after(async () => {
        productsServices.getAll.restore();
      });

      it('Should return status code 200', async () => {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })

      it('Should return an json file', async () => {
        await productsController.getAll(request, response);
        expect(response.json.calledWith(products)).to.equal(true);
      })
    })

    describe('Test when the response is not valid', async () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsServices, "getAll").returns({});
      })

      after(async () => {
        productsServices.getAll.restore();
      });

      it('Should return a status code 400', async () => {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(400)).to.be.false;
      })

      it('Should return a json file', async () => {
        await productsController.getAll(request, response);
        expect(response.json.calledWith({})).to.be.true;
      })
    })
  });

  describe('Test the register of new products', () => {
    describe('Test the result of register of new products', async () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {
          id: 1,
          name: "Nome do produto de id 1",
        };
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });
    })

    describe('Test the result of a register an invalid product', async () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });
    })
  });
})
