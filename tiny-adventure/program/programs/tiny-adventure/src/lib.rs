use anchor_lang::prelude::*;

declare_id!("6GGoL4Zq7rjGs6V5mwr5C4Yozpgz12c2DsmNXR3K3GHa");

#[program]
pub mod tiny_adventure {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.new_game_data_account.player_horizontal_position = 0;
        ctx.accounts.new_game_data_account.player_vertical_position = 0;
        msg!("A Journey Begins!");
        msg!("o.......\n........\n........");
        Ok(())
    }

    pub fn move_left(ctx: Context<MoveLeft>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_horizontal_position == 0 {
            msg!("You are all the way to the left.");
        } else {
            game_data_account.player_horizontal_position -= 1;
            print_player(game_data_account.player_horizontal_position, game_data_account.player_vertical_position);
        }
        Ok(())
    }

    pub fn move_right(ctx: Context<MoveRight>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_horizontal_position == 3 {
            msg!("You are all the way to the right.");
        } else {
            game_data_account.player_horizontal_position = game_data_account.player_horizontal_position + 1;
            print_player(game_data_account.player_horizontal_position, game_data_account.player_vertical_position);
        }
        Ok(())
    }

    pub fn move_up(ctx: Context<MoveUp>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_vertical_position == 0 {
            msg!("You are all the way to the top.");
        } else {
            game_data_account.player_vertical_position -= 1;
            print_player(game_data_account.player_horizontal_position, game_data_account.player_vertical_position);
        }
        Ok(())
    }

    pub fn move_down(ctx: Context<MoveDown>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_vertical_position == 3 {
            msg!("You are all the way to the bottom.");
        } else {
            game_data_account.player_vertical_position += 1;
            print_player(game_data_account.player_horizontal_position, game_data_account.player_vertical_position);
        }
        Ok(())
    }
}

fn print_player(player_horizontal_position: u8, player_vertical_position: u8) {
    msg!("You are on {} horizontaly and {} vertically", player_horizontal_position, player_vertical_position);
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init_if_needed,
        seeds = [b"level3"],
        bump,
        payer = signer,
        space = 8 + 1 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MoveLeft<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[derive(Accounts)]
pub struct MoveUp<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[derive(Accounts)]
pub struct MoveDown<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[account]
pub struct GameDataAccount {
    player_vertical_position: u8,
    player_horizontal_position: u8,
}
