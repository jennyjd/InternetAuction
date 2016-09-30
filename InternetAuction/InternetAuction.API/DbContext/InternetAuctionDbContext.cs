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


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            MapClients(modelBuilder);
            MapCreditCards(modelBuilder);
            MapCurrencies(modelBuilder);
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
                .Property(x => x.CurrensyId)
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
                .HasForeignKey(x => x.CurrensyId);
        }
    }
}