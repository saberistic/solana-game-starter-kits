import * as anchor from "@project-serum/anchor"
import { Program } from "@project-serum/anchor"
import { TinyAdventure } from "../target/types/tiny_adventure"
import { assert } from "chai"

describe("tiny-adventure", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.TinyAdventure as Program<TinyAdventure>
  const wallet = anchor.workspace.TinyAdventure.provider.wallet

  // PDA for the game data account
  const [newGameDataAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("level3", "utf8")],
    program.programId
  )

  it("Initialize", async () => {
    // Initialize the game data account
    const tx = await program.methods
      .initialize()
      .accounts({
        newGameDataAccount: newGameDataAccount,
        signer: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    // Fetch the game data account
    const gameDataAccount = await program.account.gameDataAccount.fetch(
      newGameDataAccount
    )
    assert(gameDataAccount.playerHorizontalPosition == 0)
    assert(gameDataAccount.playerVerticalPosition == 0)

    console.log(
      "Player horizontal position is:",
      gameDataAccount.playerHorizontalPosition.toString()
    )
    console.log(
      "Player vertical position is:",
      gameDataAccount.playerVerticalPosition.toString()
    )
  })

  it("Run Right", async () => {
    // Move right 3 times
    for (let i = 0; i < 3; i++) {
      const tx = await program.methods
        .moveRight()
        .accounts({
          gameDataAccount: newGameDataAccount,
        })
        .rpc()
    }

    // Fetch the game data account
    const gameDataAccount = await program.account.gameDataAccount.fetch(
      newGameDataAccount
    )

    assert(gameDataAccount.playerHorizontalPosition == 3)

    console.log(
      "Player horizontal position is:",
      gameDataAccount.playerHorizontalPosition.toString()
    )
  })

  it("Run Left", async () => {
    // Move left 3 times
    for (let i = 0; i < 3; i++) {
      const tx = await program.methods
        .moveLeft()
        .accounts({
          gameDataAccount: newGameDataAccount,
        })
        .rpc()
    }

    // Fetch the game data account
    const gameDataAccount = await program.account.gameDataAccount.fetch(
      newGameDataAccount
    )

    assert(gameDataAccount.playerHorizontalPosition == 0)

    console.log(
      "Player horizontal position is:",
      gameDataAccount.playerHorizontalPosition.toString()
    )
  })

  it("Run Down", async () => {
    // Move left 3 times
    for (let i = 0; i < 3; i++) {
      const tx = await program.methods
        .moveDown()
        .accounts({
          gameDataAccount: newGameDataAccount,
        })
        .rpc()
    }

    // Fetch the game data account
    const gameDataAccount = await program.account.gameDataAccount.fetch(
      newGameDataAccount
    )

    assert(gameDataAccount.playerVerticalPosition == 3)

    console.log(
      "Player vertical position is:",
      gameDataAccount.playerVerticalPosition.toString()
    )
  })

  it("Run Up", async () => {
    // Move left 3 times
    for (let i = 0; i < 3; i++) {
      const tx = await program.methods
        .moveUp()
        .accounts({
          gameDataAccount: newGameDataAccount,
        })
        .rpc()
    }

    // Fetch the game data account
    const gameDataAccount = await program.account.gameDataAccount.fetch(
      newGameDataAccount
    )

    assert(gameDataAccount.playerVerticalPosition == 0)

    console.log(
      "Player vertical position is:",
      gameDataAccount.playerVerticalPosition.toString()
    )
  })
})
