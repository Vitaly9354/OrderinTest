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
	[Route("[controller]")]
	public class SimpleDataController : ControllerBase
	{
		private readonly ILogger<HomeController> _logger;
		private readonly ISearchService _searchService;

		public SimpleDataController(ILogger<HomeController> logger, ISearchService searchService)
		{
			_logger = logger;
			_searchService = searchService;
		}

		[HttpGet]
		public async Task<IEnumerable<Restaurant>> Get()
		{
			var data = await _searchService.FindByNameAsync("Taco");
			return data;
		}

		//[HttpGet]
		//public IEnumerable<Restaurant> Get()
		//{
		//	var data = _repository.GetAll();
		//	return data;
		//}

		[Route("/error")]
		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error() => Problem();
	}
}
