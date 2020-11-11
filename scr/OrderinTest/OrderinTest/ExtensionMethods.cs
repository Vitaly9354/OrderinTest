using Microsoft.Extensions.DependencyInjection;
using OrderinTest.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest
{
	public static class ExtensionMethods
	{
		public static void AddDataProvider(this IServiceCollection services, DataProviderType dataProvider)
		{		
			if (dataProvider == DataProviderType.JsonFileStore)
			{
				services.AddScoped(typeof(IRepository<>), typeof(JsonFileRepository<>));
				services.AddScoped<JsonFileContext>();
				
			}
			else if (dataProvider == DataProviderType.MsSqlServer)
			{
				throw new NotImplementedException();
			}
		}
	}
}
