using Microsoft.EntityFrameworkCore.Migrations;

namespace SailingWeb.Data.Migrations
{
    public partial class BoatModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrewMembers_Boats_BoatId",
                table: "CrewMembers");

            migrationBuilder.AlterColumn<int>(
                name: "BoatId",
                table: "CrewMembers",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CrewMembers_Boats_BoatId",
                table: "CrewMembers",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrewMembers_Boats_BoatId",
                table: "CrewMembers");

            migrationBuilder.AlterColumn<int>(
                name: "BoatId",
                table: "CrewMembers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_CrewMembers_Boats_BoatId",
                table: "CrewMembers",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
