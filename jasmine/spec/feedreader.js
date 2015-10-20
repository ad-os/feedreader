/*
 *Application Created By: Udacity
 *Test written By: Adhyan
 *Date: 20/10/2015 (dd/MM/YYYY)
 */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/*
		 *@desc: This spec test's whether allFeeds list is defined.
		 *And the length of allFeeds list is not zero. 
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/*
		 *@desc: This spec test's whether url property of a item 
		 *in allFeeds list is defined and the url is not empty.
		 */
		it('urls are defined', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');
			}
		});
		/*
		 *@desc : This spec test's whether name property of a item 
		 *in allFeeds list is defined and the url is not empty.
		 */
		it('name is defined', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');				
			});
		});
	});
	/*
	 *@desc: This suite is to check the functionality of the side-nav.
	 */
	describe('The menu', function() {
		/*
		 *@desc: This spec test's whether the side-nav is hidden by default
		 *or not
		 */
		it('is hidden', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		/*
		 *@desc: This spec test's the visibility of the side-nav on click.
		 */
		it('changes visibility on click', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
	/*
	 *@desc: This suite is all about enteries in the feed div after async 
	 *request.
	 */
	describe('Initial Entries', function() {
		//We want the done function to be called when the 
		//load feed function is done completing.
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		/*
		 *@desc: This spec test's whether feed div has atleast one entry div
		 */
		it('has atleast one entry', function(done) {
			expect($('.feed').find('.entry').length).toBeGreaterThan(0);
			done();
		});
	});
	/*
	 *@desc: This suite is all about changes in content after click.
	 */
	describe('New Feed Selection', function() {
		var lastBlogFeed,
			newBlogFeed;
		beforeEach(function(done) {
			loadFeed(0, function() {
				lastBlogHeader = $('.feed').html();
				loadFeed(1, function() {
					newBlogHeader = $('.feed').html();
					loadFeed(0); //Restore to original state.
					done();
				});
			});
		});
		/*
		 *@desc: This spec test's for changes in the feed div after a
		 *new feed is requested.
		 */
		it('changes Content', function(done) {
			//Compare the feed contents.
			expect(lastBlogHeader).not.toBe(newBlogHeader);
			done();
		});
	});
	/*
	 *@desc: This suite is all about the features which app would contain/contains.
	 */
	describe('Has', function() {
		/*
		 *@desc: This spec test's whether the app has input field to add
		 *a custom feed.
		 */
		it('input field to add new feed', function() {
			expect($('body').find('.add-feed').length).toBe(1);
		});
		/*
		 *@desc: This spec test's whether each blog on the list has date 
		 *mentioned or not.
		 */
		it('date on each blog', function() {
			expect($('.feed').find('.date').length).toBe($('.feed').find('a').length);
		});
		/*
		 *@desc: This spec test's whether the app has a button to sort
		 *the blog list according to the date and time.
		 */
		it('has button to sort according to the date', function() {
			expect($('body').find('.sort-button').length).toBe(1);
		});
		/*
		 *@desc: This spec test's whether the app has a input field 
		 *to search a specific blog.
		 */
		it('input field to search blogs', function() {
			expect($('body').find('.search-field').length).toBe(1);
		});
		/*
		 *@desc: This spec test's whether each blog on the list has author 
		 *mentioned or not.
		 */
		it('author on each blog', function() {
			expect($('.feed').find('.author').length).toBe($('.feed').find('a').length);
		});
	});
}())
