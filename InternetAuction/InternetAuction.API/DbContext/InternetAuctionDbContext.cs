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


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            MapClients(modelBuilder);
            MapCreditCards(modelBuilder);
            MapCurrencies(modelBuilder);
            MapAuctionsCategories(modelBuilder);
            MapAuctions(modelBuilder);
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
                .HasForeignKey(x => x.UserId);
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
                .HasMaxLength(50)
                .HasColumnName("Number")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.Cash)
                .HasPrecision(10, 10)
                .HasColumnName("Cash")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.CurrencyId)
                .HasColumnName("CurrensyId")
                .IsRequired();

            modelBuilder.Entity<CreditCard>()
                .Property(x => x.UserId)
                .HasColumnName("UserId")
                .IsRequired();
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
                .HasColumnName("StartPrice")
                .IsRequired();

            modelBuilder.Entity<Auction>()
                .Property(x => x.PriceOfFastSell)
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

            //modelBuilder.Entity<AuctionCategory>()
            //    .Property(x => x.ParentAuctionCategoryId)
            //    .HasColumnName("ParentAuctionCategoryId")
            //    .IsOptional();

            //modelBuilder.Entity<AuctionCategory>()
            //    .HasMany(x => x.SubAuctionCategories)
            //    .WithOptional(x => x.ParentAuctionCategory)
            //    .HasForeignKey(x => x.ParentAuctionCategoryId);
        }
    }
}