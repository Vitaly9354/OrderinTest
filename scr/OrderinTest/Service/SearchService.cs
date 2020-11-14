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
		public IList<Restaurant> FindByName(string mealName)
		{			
			throw new NotImplementedException();
		}
		public async Task<IList<Restaurant>> FindByNameAsync(string searchKeyword, string city)
		{
			var restaurants = await _repository.GetAllAsync();
			var results = new List<Restaurant>();
			
			//it is guaranteed at client side that searchText arrives in format "<Search keryword> in <City>"
			//so we can safely parse it now
			

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
				.Where(x => x.City.Contains(city, StringComparison.InvariantCultureIgnoreCase))
				.OrderBy(x => x.Rank);

				results.AddRange(filteredAndOrderedByRank);
			}

			

			return results;
		}
	}
}
