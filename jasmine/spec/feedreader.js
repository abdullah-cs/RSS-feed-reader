/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function () {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* this is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function () {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // Second test suite
    describe('The menu', function () {

        /* this is a test that ensures the menu element is
         * hidden by default. 
         */
        it('should be hidden by default', function () {

            expect(document.body).toHaveClass('menu-hidden');

        });


        /* this is a test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('should hide/show the menu', function () {

            // I used the if-else approach to make this test independent from the previous test

            let isHidden = document.body.classList.contains('menu-hidden');

            if (isHidden) {
                $('.menu-icon-link').click();

                expect(document.body).not.toHaveClass('menu-hidden');

                $('.menu-icon-link').click();

                expect(document.body).toHaveClass('menu-hidden');
            }
            else {
                $('.menu-icon-link').click();

                expect(document.body).toHaveClass('menu-hidden');

                $('.menu-icon-link').click();

                expect(document.body).not.toHaveClass('menu-hidden');
            }



        });

    });


    // third test suite
    describe('Initial Entries', function () {



        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });

        });

        /* this is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('at least a single entry within the feed', function (done) {

            expect(document.querySelector('.feed').querySelectorAll('.entry').length).not.toBe(0);
            done();


        });

    });



    //fourth test suite
    describe('New Feed Selection', function () {

        let curentFeed;

        let firstContent;
        beforeEach(function (done) {
            loadFeed(1, function () {
                firstContent = document.querySelector('.feed').innerHTML;
                loadFeed(0, function () {
                    done();
                });
            });


        });


        /* this is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should changes content', function (done) {

            expect(document.querySelector('.feed').innerHTML).not.toBe(firstContent);
            done();
        });

    });

}());
