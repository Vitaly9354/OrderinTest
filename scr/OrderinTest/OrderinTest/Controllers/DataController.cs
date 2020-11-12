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
	public class DataController : ControllerBase
	{
		private readonly ISearchService _searchService;

		public DataController(ISearchService searchService)
		{
			_searchService = searchService;
		}

		[HttpGet("{searchText?}")]
		public async Task<IEnumerable<Restaurant>> Get(string searchText)
		{
			var data = await _searchService.FindByNameAsync(searchText);
			return data;
		}

		[Route("/error")]
		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error() => Problem();
	}
}
