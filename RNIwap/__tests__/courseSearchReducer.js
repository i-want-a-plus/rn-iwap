import { courseSearch as courseSearchReducer } from '../src/reducers/course';
import { COURSE_SEARCH } from '../src/actions/types';

describe('Course Search Reducers', () => {
  const initialState = {
    error: false,
    isPending: false,
    data: null
  };
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' };

  it(`returns the initialState when no state`, () => {
    expect(courseSearchReducer(undefined, irrelevantAction)).toEqual(initialState);
  });


  describe(`COURSE_SEARCH`, () => {
    beforeEach(() => {
      this.previousState = {
        some: 'test random state'
      };
    });

    describe(`PENDING`, () => {
      const requestAction = {
        type: `${COURSE_SEARCH}_PENDING`
      };

      it(`sets previousState with isPending:true`, () => {
        const newState = courseSearchReducer(this.previousState, requestAction);
        expect(newState).toEqual({
          ...this.previousState,
          isPending: true
        });
      });
    });

    describe(`REJECTED`, () => {
      const rejectAction = {
        type: `${COURSE_SEARCH}_REJECTED`,
        error: true,
        data: new Error('some error')
      };

      it(`sets previousState with error from action`, () => {
        const newState = courseSearchReducer(this.previousState, rejectAction);
        expect(newState).toEqual({
          ...this.previousState,
          error: rejectAction.payload,
          isPending: false,
        });
      });
    });

    describe(`FULFILLED`, () => {
      const fulfillAction = {
        type: `${COURSE_SEARCH}_FULFILLED`,
        payload: {
          test: 'test payload'
        }
      };

      it(`sets previousState with data as action's payload`, () => {
        const newState = courseSearchReducer(this.previousState, fulfillAction);
        expect(newState).toEqual({
          ...this.previousState,
          data: fulfillAction.payload,
          isPending: false,
          error: false
        });
      });
    });
  });
});
