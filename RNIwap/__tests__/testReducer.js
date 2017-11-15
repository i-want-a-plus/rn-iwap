import testReducer from '../src/reducers/test';
import { test } from '../src/actions';
import { TEST } from '../src/actions/types';

describe('Test Reducers', () => {
  const initialState = {
    error: false,
    isPending: false,
    data: null
  };
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' };

  it(`returns the initialState when no state`, () => {
    expect(testReducer(undefined, irrelevantAction)).toEqual(initialState);
  });


  describe(`TEST`, () => {
    beforeEach(() => {
      this.previousState = {
        some: 'test random state'
      };
    });

    describe(`PENDING`, () => {
      const requestAction = {
        type: `${TEST}_PENDING`
      };

      it(`sets previousState with isPending:true`, () => {
        const newState = testReducer(this.previousState, requestAction);
        expect(newState).toEqual({
          ...this.previousState,
          isPending: true
        });
      });
    });

    describe(`REJECTED`, () => {
      const rejectAction = {
        type: `${TEST}_REJECTED`,
        error: true,
        data: new Error('some error')
      };

      it(`sets previousState with error from action`, () => {
        const newState = testReducer(this.previousState, rejectAction);
        expect(newState).toEqual({
          ...this.previousState,
          error: rejectAction.payload,
          isPending: false,
        });
      });
    });

    describe(`FULFILLED`, () => {
      const fulfillAction = {
        type: `${TEST}_FULFILLED`,
        payload: {
          test: 'test payload'
        }
      };

      it(`sets previousState with data as action's payload`, () => {
        const newState = testReducer(this.previousState, fulfillAction);
        expect(newState).toEqual({
          ...this.previousState,
          data: JSON.stringify(fulfillAction.payload),
          isPending: false,
          error: false
        });
      });
    });
  });
});
