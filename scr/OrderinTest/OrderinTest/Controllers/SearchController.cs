using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrderinTest.Data;
using OrderinTest.Models;
using OrderinTest.Service;

namespace OrderinTest.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class SearchController : ControllerBase
	{
		private readonly ISearchService _searchService;

		public SearchController(ISearchService searchService)
		{
			_searchService = searchService;
		}

		[HttpGet("{city}/{searchKeyword}")]
		public async Task<IEnumerable<Restaurant>> Get(string searchKeyword, string city)
		{
			var data = await _searchService.FindByKeywordAndCityAsync(searchKeyword, city);
			return data;
		}

		[HttpPost("submitorder")]
		public object SubmitOrder([FromBody]IList<MenuItem> orderedItems)
		{
			var orderTotal = orderedItems.Select(x => x.Price).Sum();

			return new { 
				Message = $"Your order R{orderTotal} has been placed!Leave the rest up to the chefs and our drivers!" 
			};
		}

		[Route("/error")]
		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error() => Problem();
	}
}
