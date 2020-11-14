using OrderinTest.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Service
{
	public interface ISearchService
	{
		IList<Restaurant> FindByKeywordAndCity(string searchKeyword, string city);

		Task<IList<Restaurant>> FindByKeywordAndCityAsync(string searchKeyword, string city);
	}
}
