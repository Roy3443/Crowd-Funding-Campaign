
using System.Text;
using CrowdFunding.MiddleWare;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;
using DataStore.Implementation;
using DataStore.Implementation.Repositories;
using FeatureObjects.Abstraction.Managers;
using FeatureObjects.Abstraction.Services;
using FeatureObjects.Implementation.Managers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Stripe;

namespace CrowdFunding
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy => policy.AllowAnyOrigin() 
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            builder.Services.AddScoped<DapperContext>();

            
            builder.Services.AddScoped<IPasswordHashingService, PasswordHashingService>();
            builder.Services.AddScoped<ILoginManager, LoginManager>();
            builder.Services.AddScoped<ILoginRepository, LoginRepository>();

            builder.Services.AddScoped<ISignUpManager, SignUpManager>();
            builder.Services.AddScoped<ISignUpRepository, SignUpRepository>();

            builder.Services.AddScoped<ICampainDetailsManager, CampaignDetailsManager>();
            builder.Services.AddScoped<ICampaignDetailsRepository, CampaignDetailsRepository>();

            builder.Services.AddScoped<ICampaignManager, CampaignManager>();
            builder.Services.AddScoped<ICampaignRepository, CampaignRepository>();

            builder.Services.AddScoped<IInvestmentCalcManager, InvestmentCalcManager>();
            builder.Services.AddScoped<IInvestmentRepository, InvestmentRepository>();

            builder.Services.AddScoped<ICreateCampaignManager, CreateCampaignManager>();
            builder.Services.AddScoped<ICreateCampaignRepository, CreateCampaignRepository>();

            builder.Services.AddScoped<IInvestmentListRepository, InvestmentListRepository>();
            builder.Services.AddScoped<IInvestmentListManager, InvestmentsListManager>();
            
            builder.Services.AddScoped<IInvestmentDetailManager, InvestmentDetailManager>();
            builder.Services.AddScoped<IInvestmentDetailRepository, InvestmnetDetailRepository>();

            builder.Services.AddScoped<IMyCampaignManager, MyCampaignManager>();
            builder.Services.AddScoped<IMyCampaignRepository, MyCampaignRepository>();
            builder.Services.AddControllers();
            


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

            var stripeSettings = builder.Configuration.GetSection("Stripe");
            StripeConfiguration.ApiKey = stripeSettings["SecretKey"];

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });
            builder.Services.AddAuthorization();

            // 🔹 Register Your JWT Service
            builder.Services.AddScoped<IJwtToken, JwtokenService>();

            var app = builder.Build();
            app.UseCors("AllowFrontend");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseMiddleware<GlobalExceptionMiddleWare>();
            app.UseHttpsRedirection();
            app.UseAuthentication(); 
            app.UseAuthorization(); 

            //app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
