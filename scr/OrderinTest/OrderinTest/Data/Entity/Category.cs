using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Data
{
	public class Category 
	{
		public string Name { get; set; }
		public List<MenuItem> MenuItems { get; set; }
	}
}
