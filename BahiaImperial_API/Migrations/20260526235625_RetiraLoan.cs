using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BahiaImperial_API.Migrations
{
    /// <inheritdoc />
    public partial class RetiraLoan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "InceptionDate",
                table: "clients",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<decimal>(
                name: "LoanDebt",
                table: "accounts",
                type: "decimal(15,2)",
                precision: 15,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InceptionDate",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "LoanDebt",
                table: "accounts");
        }
    }
}
