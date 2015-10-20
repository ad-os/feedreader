/*
 *Application Created By: Udacity
 *Test written By: Adhyan
 *Date: 20/08/2015
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

		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		it('urls are defined', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');
			}
		});

		it('name is defined', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');                
			}
		});

	});

	describe('The menu', function() {

		it('is hidden', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		it('changes visibility on click', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	describe('Initial Entries', function() {
		//We want the done function to be called when the 
		//load feed function is done completing.
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		it('has atleast one entry', function(done) {
			expect($('.feed').find('.entry').length).toBeGreaterThan(0);
			done();
		});
	});

	describe('New Feed Selection', function() {
		var lastBlogFeed,
			newBlogFeed;

		beforeEach(function(done) {
			loadFeed(0, function() {
				lastBlogHeader = $('.feed').html();
				loadFeed(1, function() {
					newBlogHeader = $('.feed').html();
					done();
				});  
			});
		});

		it('changes Content', function(done) {
			expect(lastBlogHeader).not.toBe(newBlogHeader);
			done();
		});
	});

	describe('Has', function() {
		it('input bar to add new feed', function() {
			expect($('body').find('.add-feed').length).toBe(1);
		})

		it('date on each blog', function() {
			expect($('.feed').find('.date').length).toBe($('.feed').find('a').length);
		})

		it('has button to sort according to the date', function() {
			expect($('body').find('.sort-button').length).toBe(1);
		})
	});


}());
