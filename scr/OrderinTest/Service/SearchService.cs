using OrderinTest.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Service
{
	public class SearchService : ISearchService
	{
		private readonly IRepository<Restaurant> _repository;
		public SearchService(IRepository<Restaurant> repository)
		{
			_repository = repository;
		}
		public IList<Restaurant> FindByKeywordAndCity(string searchKeyword, string city)
		{			
			throw new NotImplementedException();
		}
		public async Task<IList<Restaurant>> FindByKeywordAndCityAsync(string searchKeyword, string city)
		{
			var restaurants = await _repository.GetAllAsync();
			var results = new List<Restaurant>();
			
			var groups = restaurants.GroupBy(r => r.Categories.FindAll(c => c.Name.Contains(searchKeyword, StringComparison.InvariantCultureIgnoreCase)).SelectMany(m => m.MenuItems).Count() + r.Categories.FindAll(c => !c.Name.Contains(searchKeyword, StringComparison.InvariantCultureIgnoreCase)).SelectMany(m => m.MenuItems).Where(i => i.Name.Contains(searchKeyword, StringComparison.InvariantCultureIgnoreCase)).Count());
			var groupsOrdered = groups.OrderByDescending(g => g.Key).Where(g => g.Key > 0);

			foreach(var g in groupsOrdered)
			{
				var filteredAndOrderedByRank = g.Select(x => new Restaurant()	{
						Id = x.Id,
						Name = x.Name,
						City = x.City,
						Suburb = x.Suburb,
						Rank = x.Rank,
						LogoPath = x.LogoPath,
						Categories = x.Categories.FindAll(c => c.Name.Contains(searchKeyword, StringComparison.InvariantCultureIgnoreCase)).Union(x.Categories.FindAll(c => !c.Name.Contains(searchKeyword, StringComparison.InvariantCultureIgnoreCase)).Select(x => new Category { Name = x.Name, MenuItems = x.MenuItems.FindAll(mi => mi.Name.Contains(searchKeyword, StringComparison.InvariantCultureIgnoreCase)) })).Where(c => c.MenuItems.Count > 0).ToList()
				})
				.Where(x => x.City.Contains(city, StringComparison.InvariantCultureIgnoreCase) || x.Suburb.Contains(city, StringComparison.InvariantCultureIgnoreCase))
				.OrderBy(x => x.Rank);

				results.AddRange(filteredAndOrderedByRank);
			}

			

			return results;
		}
	}
}
