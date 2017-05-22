import {
  prefixObjectValues
} from '../../utils';

export const PREFIX = "@@SEARCH/";

let types = {
  INIT: "INIT",

  REQUEST_SERIES: "REQUEST_SERIES",
  RECEIVE_SERIES: "RECEIVE_SERIES",
  FAILURE_SERIES: "FAILURE_SERIES",

  QUERY_SERIES: "QUERY_SERIES",

  UPDATE_USER_INFO_ON_LIST: "UPDATE_USER_INFO_ON_LIST"

};

export default prefixObjectValues(types, PREFIX);
