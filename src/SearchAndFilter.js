/**
 * A class used by Sidebar component to handle the search and filter functionality.
 *
 * Implement your own search and filter functionality here.
 *
 */

class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    // we want to return the courses (whole) that fit the various filters

    var subjectFilter = courses.filter((course, i) =>{

      if (subject == "All" || course.subject == subject){
        return course
      }

    })

    var creditFilter = subjectFilter.filter((course, i) =>{

      if (minimumCredits == "" || course.credits >= minimumCredits){
        if (maximumCredits == "" || course.credits <= maximumCredits){
          return course
        }
      }

    })

    var searchIn = search.trim().toLowerCase()
    var searchFilter = creditFilter.filter((course, i) =>{

      if (searchIn == "" || course.keywords.includes(searchIn)){
        return course
      }

    })

    return searchFilter;
  }
}

export default SearchAndFilter;
