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

		public async Task<IList<Restaurant>> FindByNameAsync(string mealName)
		{
			var restaurants = await _repository.GetAllAsync();

			return restaurants;
		}
	}
}
