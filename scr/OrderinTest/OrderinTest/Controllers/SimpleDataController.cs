using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrderinTest.Data;
using OrderinTest.Models;

namespace OrderinTest.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class SimpleDataController : ControllerBase
	{
		private readonly ILogger<HomeController> _logger;
		private readonly IRepository<Restaurant> _repository;

		public SimpleDataController(ILogger<HomeController> logger, IRepository<Restaurant> repository)
		{
			_logger = logger;
			_repository = repository;
		}
	
		//[HttpGet]
		//public async Task<IEnumerable<Restaurant>> GetAllItemsAsync()
		//{
		//	var data = await _repository.GetAllAsync();
		//	return data;
		//}

		[HttpGet]
		public IEnumerable<Restaurant> Get()
		{
			var data = _repository.GetAll();
			return data;
		}

		[Route("/error")]
		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error() => Problem();
	}
}
