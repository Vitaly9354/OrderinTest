using NUnit.Framework;
using OrderinTest.Data;
using OrderinTest.Service;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Tests
{
	public class SearchServiceTests
	{
		private IRepository<Restaurant> _repositoryMock;

		[SetUp]
		public void Setup()
		{
		}

		[Test]
		public void ShoudFindTwoTacoRestaurantInCapeTown()
		{
			SetUpMocks();

			const string keyword = "Taco";
			const string city = "Cape Town";
			
			SearchService searchService = new SearchService(_repositoryMock);
			
			var result = searchService.FindByKeywordAndCityAsync(keyword, city);

			Assert.That(result.Result.Count == 2);

			Assert.Pass();
		}

		[Test]
		public void ResultsShouldBeOrderedByRank()
		{
			SetUpMocks();

			const string keyword = "Taco";
			const string city = "Cape Town";

			SearchService searchService = new SearchService(_repositoryMock);

			var result = searchService.FindByKeywordAndCityAsync(keyword, city);

			Assert.That(result.Result.Count == 2);
			Assert.That(result.Result[0].Rank < result.Result[1].Rank);

			Assert.Pass();
		}

		private void  SetUpMocks()
		{
			var repositoryMock = new Mock<IRepository<Restaurant>>();

			var searchTestData = Task<IList<Restaurant>>.Factory.StartNew(() =>
			{
				return new List<Restaurant>() {
						new Restaurant {
							Id = 1001,
							 City = "Cape Town",
							 LogoPath = "/test/",
							 Name="Tasty Meals",
							 Rank = 3,
							 Suburb="TestSuburb",
							 Categories = new List<Category> (){
									new Category() {
										Name = "Taco",
										MenuItems = new List<MenuItem>(){
											new MenuItem() {
													Id = 2002,
													Name = "Fried Taco",
													Price = 99.98M
											}
										}
									}
								}
						},
						new Restaurant {
							Id = 1002,
							 City = "Cape Town",
							 LogoPath = "/test/",
							 Name="Test Restaurant",
							 Rank = 1,
							 Suburb="TestSuburb",
							 Categories = new List<Category> (){
									new Category() {
										Name = "Non taco category",
										MenuItems = new List<MenuItem>(){
											new MenuItem() {
													Id = 2005,
													Name = "Another Taco",
													Price = 99.98M
											}
										}
									}
								}
						},
						new Restaurant {
							Id = 1003,
							 City = "Unknown City",
							 LogoPath = "/test/",
							 Name="No Tacos Restaurant",
							 Rank = 2,
							 Suburb="TestSuburb",
							 Categories = new List<Category> (){
									new Category() {
										Name = "Should Not Find This",
										MenuItems = new List<MenuItem>(){
											new MenuItem() {
													Id = 2006,
													Name = "Should Not Find This",
													Price = 99.98M
											}
										}
									}
								}
						}
					};
			});

			searchTestData.Wait();

			repositoryMock.Setup(o => o.GetAllAsync())
							.Returns(searchTestData);

			_repositoryMock = repositoryMock.Object;
		}
	}
}