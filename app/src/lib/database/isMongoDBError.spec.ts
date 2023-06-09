import { expect } from 'chai';
import { isMongoDBError } from './index';

// npm run test:local -- --grep "isMongoDBError"

describe('isMongoDBError', () => {
    it('Object passed has required key/values: TRUE', () => {
        expect(isMongoDBError({name: "MongoServerError", code: "E11000"})).to.be.true;
    });

    it('Object passed does not have required key/values: FALSE', () => {
        expect(isMongoDBError({tile: "a thing", code: "E11000"})).to.be.false;
        expect(isMongoDBError({message: "a thing", code: 400})).to.be.false;
        expect(isMongoDBError({message: "a thing", code: "400"})).to.be.false;
    });
});
