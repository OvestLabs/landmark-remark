using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using React;
using React.AspNet;

namespace LandmarkRemark
{
	public class Startup
	{
		private static void ConfigureReact(IReactSiteConfiguration config)
		{
			config.AddScript("~/js/App.jsx");
		}

		private static void ConfigureRoutes(IRouteBuilder routes)
		{
			routes.MapRoute(
				name: "default",
				template: "{controller=Home}/{action=Index}/{id?}");
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public IServiceProvider ConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddReact();
			services.AddMvc();

			return services.BuildServiceProvider();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseReact(ConfigureReact);
			app.UseStaticFiles();
			app.UseMvc(ConfigureRoutes);
		}
	}
}
