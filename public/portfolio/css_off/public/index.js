// Custom JS
(function (doc, win) {
  /**
   * Gets current scroll height of window
   * @returns {Integer} Scroll height of window
   */
  function getScrollTop() {
    var body = doc.body,
        docElt = document.documentElement;
    if (body && body.scrollTop) {
      return body.scrollTop;
    } if (docElt && docElt.scrollTop) {
      return docElt.scrollTop;
    } if (win.pageYOffset) {
      return win.pageYOffset;
    }
    return 0;
  }
  var scrollSpeed = 3,
      lastScrollTimeout;

  /**
   * Helper method for my current scripting needs
   * @param {String} id Id of element to grab from the DOM
   * @returns {Object} Object with select DOM methods
   */
  var $ = function (id) {
    var elt = id;
    if( (typeof id).toLowerCase() === "string" ) {
      elt = doc.getElementById(id);
    }

    return {
      /**
       * Bind event to DOM Level 0 of element (there can only be one)
       * @param {String} evt Name of event to bind to
       * @param {Function} fn Function to bind to event
       */
      'bind': function (evt, fn) {
        elt[evt] = function (e) {
          var eObj;

          // Find the true event
          e = e || window.event;

          // Give our custom object a way to stop default
          eObj = {
            'info': e,
            'preventDefault': function () {
              // IE bindings
              e.cancelBubble = true;
              e.returnValue = false;

              // Everything else bindings
              if( e.preventDefault ) {
                e.preventDefault();
              }
              if( e.stopPropagation ) {
                e.stopPropagation();
              }
            }
          };

          fn(eObj);
        };
      },
      /**
       * Get text of element
       * @returns {String} str Text to set inside of element
       */
      'getText': function () {
        if (elt.textContent) {
          return elt.textContent;
        } else if (elt.innerText) {
          return elt.innerText;
        } else if (elt.text) {
          return elt.text;
        }
        return elt.innerHTML;
      },
      /**
       * Set text of element
       * @param {String} str Text to set inside of element
       */
      'setText': function (str) {
        if (elt.textContent) {
          elt.textContent = str;
        } else if (elt.innerText) {
          elt.innerText = str;
        } else if (elt.text) {
          elt.text = str;
        } else {
          elt.innerHTML = str;
        }
      },
      /**
       * Get child elements by their tag name
       * @param {String} tag Tag name of elements to find
       * @returns {HTMLCollection} Object with select DOM methods
       */
      'getChildrenByTagName': function (tag) {
        return elt.getElementsByTagName(tag);
      },
      /**
       * Get a property of elt
       * @param {String} prop Property to retrieve
       * @returns {Mixed} Value of property
       */
      'get': function (prop) {
        return elt[prop];
      },
      /**
       * Set a property of elt
       * @param {String} prop Property to set
       * @param {Mixed} val Value to set
       */
      'set': function (prop, val) {
        elt[prop] = val;
      },
      /**
       * Wrap a elt in a containing div
       * @returns {Object} $'d containing div
       */
      'wrap': function () {
        var div = doc.createElement('div');
        elt.parentNode.insertBefore(div, elt);
        div.appendChild(elt);
        div.id = elt.id + 'Container';
        return $(div);
      },
      /**
       * Append given element after element
       * @param {HTMLElement} appendElt Element to append
       * @returns {HTMLElement} The element that is objectified
       */
      'append': function (appendElt) {
        elt.appendChild(appendElt);
        return this;
      },
      /**
       * Create and append a new element to this containing element
       * @param {String} tag Tag of element to append
       * @returns {Object} Objectified new element
       */
      'appendNew': function (tag) {
        var newElt = document.createElement(tag);
        this.append(newElt);
        return $(newElt);
      },
      /**
       * Get the Y offset of this element [SCROLLING]
       * @returns {Integer} Y offset of element
       */
      'getYOffset': function () {
        // Get the offset of this element and all of its parents
        var offset = elt.offsetTop,
            offsetParent = elt.offsetParent;
        while ( offsetParent ) {
          offset += offsetParent.offsetTop;
          offsetParent = offsetParent.offsetParent;
        }

        // Disabled to compensate for media queries
        // // Memoize for later
        // this.getYOffset = function () {
          // return offset;
        // };

        // Return the offset
        return offset;
      },
      /**
       * Smooth scrolls window to element via async callback loop
       */
      'smoothScrollTo': function () {
        // We must re-query in case of window resize
        var innerHeight = win.innerHeight || doc.documentElement.clientHeight,
            scrollBarHeight = doc.body.scrollHeight,
            scrollTop = getScrollTop(),
            eltOffset = this.getYOffset(),
            that = this;

        // Clear the last timeout in case there we quickly switch between scrolls
        if( lastScrollTimeout ) {
          clearTimeout(lastScrollTimeout);
        }

        // If the element is below our current offset
        if( eltOffset > scrollTop ) {
          // And the element is not in view
          if( scrollBarHeight - eltOffset > innerHeight ) {
            scrollTop += Math.ceil((eltOffset - scrollTop)/scrollSpeed);
          // And the element is in view
          } else {
            scrollTop += Math.ceil((eltOffset - scrollTop - (scrollBarHeight - eltOffset))/scrollSpeed);
          }
        } else {
          scrollTop += (eltOffset - scrollTop)/scrollSpeed;
        }

        win.scrollTo(0, scrollTop);

        // Asynchronously loop scroll
        if( scrollTop !== eltOffset ) {
          lastScrollTimeout = setTimeout( function () { that.smoothScrollTo(); }, 50);
        }
      }
    };
  };

  // Bindings for Obstacles (DRY)
  var obstacles = [{
        'elt': $('theTank'),
        'name': 'The Tank',
        'desc': 'A huge tank of balloons and peanuts!',
        'img': 'public/images/the_tank.png'
      }, {
        'elt': $('sundaeSlide'),
        'name': 'Sundae Slide',
        'desc': 'Chocolate and vanilla ice cream covered slide!',
        'img': 'public/images/sundae_slide.png'
      }, {
        'elt': $('humanHamsterWheel'),
        'name': 'Human Hamster Wheel',
        'desc': 'Spin the wheel!',
        'img': 'public/images/human_hamster_wheel.png'
      }, {
        'elt': $('downTheHatch'),
        'name': 'Down The Hatch',
        'desc': '6ft slide covered in gunk!',
        'img': 'public/images/down_the_hatch.png'
      }, {
        'elt': $('pickIt'),
        'name': 'Pick It!',
        'desc': 'A giant nose filled with gunk!',
        'img': 'public/images/pick_it.png'
      }, {
        'elt': $('theWringer'),
        'name': 'The Wringer',
        'desc': 'Giant rollers drenched in gunk!',
        'img': 'public/images/the_wringer.png'
      }],
      obstacle,
      i,
      featuredObstacle = obstacles[3].elt,
      obstacleDescription = $('obstaclesDescription'),
      nameElt = $(obstacleDescription.getChildrenByTagName('h3')[0]),
      descElt = $(obstacleDescription.getChildrenByTagName('h4')[0]),
      imgElt = $(obstacleDescription.getChildrenByTagName('img')[0]);

  function getObstacleFn(obstacle) {
    return function () {
      // Change the obstacleDescription
      var name = obstacle.name;
      nameElt.setText( name );
      descElt.setText( obstacle.desc );
      imgElt.set('alt', name);
      imgElt.set('src', obstacle.img);

      // Display the new featured figure
      featuredObstacle.set('className', '');
      obstacle.elt.set('className', 'featuredObstacle');
      featuredObstacle = obstacle.elt;
    };
  }

  for( i = obstacles.length; i--; ) {
    obstacle = obstacles[i];
    // Closure and bind
    obstacle.elt.bind('onclick', getObstacleFn(obstacle));
  }

  // Select box overlay
  // Credit to http://ryanfait.com/resources/custom-checkboxes-and-radio-buttons/
  var selectArr = [$('teamColor'), $('gender')],
      select,
      container,
      span,
      img,
      updateTextFn;

  /**
   * Takes in $(select) and returns current text
   * @param {Object} select Objectifieid select box
   * @returns {String|undefined} Text of select box
   */
  function getSelectText(select) {
    return $(select.get('options')[select.get('selectedIndex')]).getText();
  }

  function getUpdateSelectFn(span, select) {
    return function () {
      span.setText( getSelectText(select) );
    };
  }

  for( i = selectArr.length; i--; ) {
    select = selectArr[i];
    // Wrap in a CSS'd container
    container = select.wrap();

    // Add opacity class
    select.set('className', 'styled');

    // Append span and img
    span = container.appendNew('span');
    img = container.appendNew('img');
    img.set('alt', getSelectText(select));
    img.set('src', 'public/images/green_texture.png');

    // Create text change function for onchange
    updateTextFn = getUpdateSelectFn(span, select);

    // Execute and bind to onchange
    updateTextFn();
    select.bind('onchange', updateTextFn);
  }

  // Smooth scroller
  // Credit to http://www.dezinerfolio.com/2007/08/08/df-javascript-smooth-scroll
  var navLinkArr = $('navBar').getChildrenByTagName('a'),
      navLink,
      targetId,
      targetElt;

  function getSmoothScrollFn(targetElt) {
    return function (e) {
      e.preventDefault();
      targetElt.smoothScrollTo();
    };
  }

  for( i = navLinkArr.length; i--; ) {
    navLink = $(navLinkArr[i]);
    targetId = navLink.get('href').split('#')[1];
    targetElt = $( targetId );
    navLink.bind('onclick', getSmoothScrollFn(targetElt));
  }

  // Registration timer
  var timer = $('contestantTimer');

  function countdownContestantTimer() {
    var time = +timer.getText();
    if( time > 0 ) {
      timer.setText( time - 1 );
      setTimeout(countdownContestantTimer, 1000);
    }
  }

  // Async loop that checks if contestantTimer is visible
  function asyncContestantTimer() {
    var innerHeight = win.innerHeight || doc.documentElement.clientHeight,
        scrollTop = getScrollTop(),
        eltOffset = timer.getYOffset();

    if( scrollTop === 0 ) {
      setTimeout(asyncContestantTimer, 100);
      return;
    }

    // If it is in the viewport, start the timer
    if( innerHeight + scrollTop > eltOffset ) {
      setTimeout(countdownContestantTimer, 1000);
    } else {
    // Otherwise, continue async loop
      setTimeout(asyncContestantTimer, 500);
    }
  }
  asyncContestantTimer();

  // Opacity switch for navBar
  var navBar = $('navBar'),
      alreadyAtTop;

  // Async loop that checks if nav bar is at the top
  function asyncNavTimer() {
    var scrollTop = getScrollTop(),
        topBool = (scrollTop < 10),
        klass;

    // Reduce repaints significantly by touching className less
    if( alreadyAtTop !== topBool ) {
      // By default, set as opaque
      klass = '';
      // If we are at the top, make it translucent
      if( topBool === true ) {
        klass = 'translucent';
      }

      alreadyAtTop = topBool;
      navBar.set('className', klass);
    }

    setTimeout( asyncNavTimer, 100 );
  }
  asyncNavTimer();
}(document, window));