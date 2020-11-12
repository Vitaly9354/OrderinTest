using OrderinTest.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Service
{
	public interface ISearchService
	{
		IList<Restaurant> FindByName(string mealName);

		Task<IList<Restaurant>> FindByNameAsync(string mealName);
	}
}
