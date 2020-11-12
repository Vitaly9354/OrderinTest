using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Data
{
	public class MenuItem : BaseEntity
	{
		public string Name { get; set; }
		public decimal Price { get; set; }
	}
}
