import { course as courseReducer } from '../src/reducers/course';
import { COURSE } from '../src/actions/types';

describe('Course Reducers', () => {
  const initialState = {};
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' };

  it(`returns the initialState when no state`, () => {
    expect(courseReducer(undefined, irrelevantAction)).toEqual(initialState);
  });


  describe(`COURSE`, () => {
    beforeEach(() => {
      this.previousState = {
        some: 'test random state'
      };
    });

    describe(`PENDING`, () => {
      const requestAction = {
        type: `${COURSE}_PENDING`,
        payload: {
          id: 1
        }
      };

      it(`sets previousState with isPending:true`, () => {
        const newState = courseReducer(this.previousState, requestAction);
        expect(newState).toEqual({
          ...this.previousState,
          [requestAction.payload.id]: {
            isPending: true
          }
        });
      });
    });

    describe(`REJECTED`, () => {
      const rejectAction = {
        type: `${COURSE}_REJECTED`,
        error: true,
        data: new Error('some error'),
        payload: {
          id: 1
        }
      };

      it(`sets previousState with error from action`, () => {
        const newState = courseReducer(this.previousState, rejectAction);
        expect(newState).toEqual({
          ...this.previousState,
          [rejectAction.payload.id]: {
            error: rejectAction.payload,
            isPending: false
          }
        });
      });
    });

    describe(`FULFILLED`, () => {
      const fulfillAction = {
        type: `${COURSE}_FULFILLED`,
        payload: {
          id: 1,
          test: 'test payload'
        }
      };

      it(`sets previousState with data as action's payload`, () => {
        const newState = courseReducer(this.previousState, fulfillAction);
        expect(newState).toEqual({
          ...this.previousState,
          [fulfillAction.payload.id]: {
            isPending: false,
            error: false,
            ...fulfillAction.payload
          }
        });
      });
    });
  });
});
