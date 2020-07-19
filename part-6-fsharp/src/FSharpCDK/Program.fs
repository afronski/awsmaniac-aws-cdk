open Amazon.CDK
open FSharpCDK

[<EntryPoint>]
let main _ =
    let app = App(null)

    FSharpCDKStack(app, "FSharpCDK", StackProps()) |> ignore

    app.Synth() |> ignore
    0
