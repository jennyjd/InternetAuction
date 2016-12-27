using System;
using System.Data.Entity;
using InternetAuction.API.Models;

namespace InternetAuction.API.DbContext
{
    public class InternetAuctionDbContext : System.Data.Entity.DbContext
    {
        public InternetAuctionDbContext() : base("name=InternetAuction")
        {
        }


        public DbSet<Client> Clients { get; set; }
        public DbSet<CreditCard> CreditCards { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<AuctionCategory> AuctionsCategories { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<GoodsState> GoodStates { get; set; }
        public DbSet<AuctionHistory> AuctionsHistory { get; set; }
        public DbSet<CurrencyConversion> CurrenciesConversions { get; set; }
        public DbSet<AuctionResult> AuctionsResults { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            MapClients(modelBuilder);
            MapCreditCards(modelBuilder);
            MapCurrencies(modelBuilder);
            MapAuctionsCategories(modelBuilder);
            MapAuctions(modelBuilder);
            MapGoodsStates(modelBuilder);
            MapAuctionsHistory(modelBuilder);
            MapCurrenciesConversions(modelBuilder);
            MapAuctionsResults(modelBuilder);
        }


        private void MapClients(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .ToTable("Clients");

            modelBuilder.Entity<Client>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<Client>()
                .Property(x => x.FirstName)
                .HasMaxLength(50)
                .HasColumnName("FirstName")
                .IsRequired();

            modelBuilder.Entity<Client>()
                .Property(x => x.LastName)
                .HasMaxLength(100)
                .HasColumnName("LastName")
                .IsRequired();

            modelBuilder.Entity<Client>()
                .Property(x => x.Patronymic)
                .HasMaxLength(100)
                .HasColumnName("Patronymic")
                .IsOptional();

            modelBuilder.Entity<Client>()
                .HasMany(x => x.CreditCards)
                .WithRequired(x => x.Client)
                .HasForeignKey(x => x.ClientId);
        }


        private void MapCreditCards(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CreditCard>()
                .ToTable("CreditCards");

            modelBuilder.Entity<CreditCard>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.Number)
                .HasMaxLength(16)
                .HasColumnName("Number")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.Cash)
                .HasPrecision(20, 5)
                .HasColumnName("Cash")
                .IsOptional();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.ValidTo)
                .HasColumnName("ValidTo")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.OwnerFirstName)
                .HasMaxLength(50)
                .HasColumnName("OwnerFirstName")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.OwnerLastName)
                .HasMaxLength(50)
                .HasColumnName("OwnerLastName")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.CurrencyId)
                .HasColumnName("CurrencyId")
                .IsOptional();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.ClientId)
                .HasColumnName("ClientId")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.IsRemoved)
                .HasColumnName("IsRemoved")
                .IsOptional();
        }


        private void MapCurrencies(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Currency>()
                .ToTable("Currencies");

            modelBuilder.Entity<Currency>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<Currency>()
                .Property(x => x.Name)
                .HasMaxLength(10)
                .HasColumnName("Name")
                .IsOptional();

            modelBuilder.Entity<Currency>()
                .Property(x => x.ShortName)
                .HasMaxLength(5)
                .HasColumnName("ShortName")
                .IsRequired();

            modelBuilder.Entity<Currency>()
                .HasMany(x => x.CreditCards)
                .WithRequired(x => x.Currency)
                .HasForeignKey(x => x.CurrencyId);

            modelBuilder.Entity<Currency>()
                .HasMany(x => x.Auctions)
                .WithRequired(x => x.Currency)
                .HasForeignKey(x => x.CurrencyId);
        }


        private void MapAuctionsCategories(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuctionCategory>()
                .ToTable("AuctionsCategories");

            modelBuilder.Entity<AuctionCategory>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<AuctionCategory>()
                .Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("Name")
                .IsRequired();

            modelBuilder.Entity<AuctionCategory>()
                .Property(x => x.ParentAuctionCategoryId)
                .HasColumnName("ParentAuctionCategoryId")
                .IsOptional();

            modelBuilder.Entity<AuctionCategory>()
                .HasMany(x => x.SubAuctionCategories)
                .WithOptional(x => x.ParentAuctionCategory)
                .HasForeignKey(x => x.ParentAuctionCategoryId);
        }


        private void MapAuctions(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Auction>()
                .ToTable("Auctions");

            modelBuilder.Entity<Auction>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<Auction>()
                .Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("Name")
                .IsRequired();

            modelBuilder.Entity<Auction>()
                .Property(x => x.Description)
                .HasMaxLength(1000)
                .HasColumnName("Description")
                .IsOptional();

            modelBuilder.Entity<Auction>()
                .Property(x => x.StartPrice)
                .HasPrecision(20, 5)
                .HasColumnName("StartPrice")
                .IsRequired();

            modelBuilder.Entity<Auction>()
                .Property(x => x.PriceOfFastSell)
                .HasPrecision(20, 5)
                .HasColumnName("PriceOfFastSell")
                .IsOptional();

            modelBuilder.Entity<Auction>()
                .Property(x => x.CategoryId)
                .HasColumnName("CategoryId")
                .IsRequired();

            modelBuilder.Entity<Auction>()
                .Property(x => x.StartDate)
                .HasColumnName("StartDate")
                .IsRequired();

            modelBuilder.Entity<Auction>()
                .Property(x => x.EndDate)
                .HasColumnName("EndDate")
                .IsRequired();

            modelBuilder.Entity<Auction>()
               .Property(x => x.CurrencyId)
               .HasColumnName("CurrencyId")
               .IsRequired();

            modelBuilder.Entity<Auction>()
               .Property(x => x.ClientId)
               .HasColumnName("ClientId")
               .IsRequired();

            modelBuilder.Entity<Auction>()
               .Property(x => x.GoodStateId)
               .HasColumnName("GoodStateId")
               .IsRequired();

            modelBuilder.Entity<Auction>()
               .Property(x => x.IsCompleted)
               .HasColumnName("IsCompleted")
               .IsRequired();

            //modelBuilder.Entity<AuctionCategory>()
            //    .Property(x => x.ParentAuctionCategoryId)
            //    .HasColumnName("ParentAuctionCategoryId")
            //    .IsOptional();

            //modelBuilder.Entity<AuctionCategory>()
            //    .HasMany(x => x.SubAuctionCategories)
            //    .WithOptional(x => x.ParentAuctionCategory)
            //    .HasForeignKey(x => x.ParentAuctionCategoryId);
        }


        private void MapGoodsStates(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GoodsState>()
                .ToTable("GoodsState");

            modelBuilder.Entity<GoodsState>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<GoodsState>()
                .Property(x => x.Name)
                .HasMaxLength(20)
                .HasColumnName("Name")
                .IsRequired();

            modelBuilder.Entity<GoodsState>()
                .HasMany(x => x.Auctions)
                .WithRequired(x => x.GoodsState)
                .HasForeignKey(x => x.GoodStateId);
        }


        private void MapCurrenciesConversions(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CurrencyConversion>()
                .ToTable("CurrenciesConversions");

            modelBuilder.Entity<CurrencyConversion>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<CurrencyConversion>()
                .Property(x => x.FromCurrencyId)
                .HasColumnName("FromCurrencyId")
                .IsRequired();

            modelBuilder.Entity<CurrencyConversion>()
                .Property(x => x.ToCurrencyId)
                .HasColumnName("ToCurrencyId")
                .IsRequired();

            modelBuilder.Entity<CurrencyConversion>()
               .Property(x => x.Rate)
               .HasPrecision(20, 5)
               .HasColumnName("Rate")
               .IsRequired();
        }


        private void MapAuctionsHistory(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuctionHistory>()
                .ToTable("AuctionsHistory");

            modelBuilder.Entity<AuctionHistory>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<AuctionHistory>()
                .Property(x => x.ClientId)
                .HasColumnName("ClientId")
                .IsRequired();

            modelBuilder.Entity<AuctionHistory>()
                .Property(x => x.AuctionId)
                .HasColumnName("AuctionId")
                .IsRequired();

            modelBuilder.Entity<AuctionHistory>()
               .Property(x => x.CreditCardId)
               .HasColumnName("CreditCardId")
               .IsRequired();

            modelBuilder.Entity<AuctionHistory>()
               .Property(x => x.CreditCardCurrencyId)
               .HasColumnName("CreditCardCurrencyId")
               .IsRequired();

            modelBuilder.Entity<AuctionHistory>()
               .Property(x => x.CreditCardSum)
               .HasPrecision(20, 5)
               .HasColumnName("CreditCardSum")
               .IsRequired();

            modelBuilder.Entity<AuctionHistory>()
               .Property(x => x.BetSum)
               .HasPrecision(20, 5)
               .HasColumnName("BetSum")
               .IsRequired();

            modelBuilder.Entity<AuctionHistory>()
               .Property(x => x.Date)
               .HasColumnName("Date")
               .IsRequired();
        }


        private void MapAuctionsResults(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuctionResult>()
                .ToTable("AuctionsResults");

            modelBuilder.Entity<AuctionResult>()
                .HasKey(x => x.Id)
                .HasEntitySetName("Id");

            modelBuilder.Entity<AuctionResult>()
                .Property(x => x.ClientId)
                .HasColumnName("ClientId")
                .IsRequired();

            modelBuilder.Entity<AuctionResult>()
                .Property(x => x.AuctionId)
                .HasColumnName("AuctionId")
                .IsRequired();

            modelBuilder.Entity<AuctionResult>()
                .Property(x => x.IsSeenResult)
                .HasColumnName("IsSeenResult")
                .IsRequired();

            modelBuilder.Entity<AuctionResult>()
                .Property(x => x.ChargeFromWin)
                .HasPrecision(20, 5)
                .HasColumnName("ChargeFromWin")
                .IsOptional();
        }
    }
}