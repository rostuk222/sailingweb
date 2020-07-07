using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SailingWeb.Data.Migrations
{
    public partial class BoatModelFinal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrewMembers_CrewRoles_RoleId",
                table: "CrewMembers");

            migrationBuilder.DropTable(
                name: "CrewRoles");

            migrationBuilder.DropIndex(
                name: "IX_CrewMembers_RoleId",
                table: "CrewMembers");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "CrewMembers");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "CrewMembers",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "CrewMembers");

            migrationBuilder.AddColumn<Guid>(
                name: "RoleId",
                table: "CrewMembers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "CrewRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrewRoles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CrewMembers_RoleId",
                table: "CrewMembers",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_CrewMembers_CrewRoles_RoleId",
                table: "CrewMembers",
                column: "RoleId",
                principalTable: "CrewRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
