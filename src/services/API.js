export default class API {
  getLocalities() {
    return graphQuery(`
      {
        allLocalities(orderBy: name_ASC, filter: {isPublished: true}) {
          name
          moveCity
          availabilityDescription
          mapCenter
          mapDefaultZoom
          passports(orderBy: price_ASC) {
            price
            description
            partnerLogos {
              handle
            }
            signUpUrl
          }
        }
      }
      `, 'allLocalities')
  }

  getVenuesForLocality(locality)  {
    return getJSON("https://www.movegb.com/api/2/cities/"+locality.moveCity+"/partners");
  }

  getFeaturedActivities(locality) {
    return graphQuery(`
      query Activities($location: String!) {
        allActivities(filter: {localities_some: {name: $location}, isPublished: true}) {
          name
        }
      }
    `, 'allActivities', { location: locality });
  }

  getFeaturedPartners(locality, activities) {
    if (activities.length === 0) {
      return graphQuery(`
        query Parters($location: String!) {
          allPartners(orderBy: name_ASC, filter: {localities_some: {name: $location}, isPublished: true}) {
            id
            name
            description
            rating
            shortAddress
            logo {
              handle
            }
            image {
              handle
            }
            reviews {
              customerName
              rating
              content
            }
          }
        }
        `, 'allPartners', {location: locality});
    } else {
      const nActivities = activities.map(a => a.replace('_', ' '));
      return graphQuery(`
        query Parters($location: String!, $activities: [String!]) {
          allPartners(orderBy: name_ASC, filter: {AND: [{localities_some: {name: $location}}, {activities_some: {name_in: $activities}}], isPublished: true}) {
            id
            name
            description
            rating
            shortAddress
            logo {
              handle
            }
            image {
              handle
            }
            reviews {
              customerName
              rating
              content
            }
          }
        }
        `, 'allPartners', {location: locality, activities: nActivities});
    }

  }
}

function graphQuery(query, node, variables) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "https://api.graphcms.com/simple/v1/cjbzac72d0iz201982aze5558");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = (r) => {
      resolve(xhr.response.data[node]);
    };
    xhr.onerror = (r) => {
      reject({
        status: r.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(JSON.stringify({
      query: query,
      variables: variables,
    }));
  });
}

function getJSON(url, params, callback) {
  const urlWithParams = url + '?' + encodeQueryData(params)
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlWithParams, true);
    xhr.onload = (r) => {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = (r) => {
      reject({
        status: r.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

function encodeQueryData(data) {
  let ret = [];
  for (let d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
}
