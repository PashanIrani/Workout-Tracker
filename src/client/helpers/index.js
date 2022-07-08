export const getURLParams = () => {
  let obj = {};

  let url = location.href.split("?");

  /* get the part after the ? */
  if (url.length == 2) {
    url = url[1];
  } else {
    return obj;
  }

  let pairs = url.split("&"); //gets key and value form the url

  /* organizes the pairs into JSON form */
  for (let i = 0; i < pairs.length; i++) {
    let temp = pairs[i].split("=");
    obj[temp[0]] = temp[1];
  }

  return obj;
};
