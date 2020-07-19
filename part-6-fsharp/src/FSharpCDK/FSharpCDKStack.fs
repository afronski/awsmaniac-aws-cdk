namespace FSharpCDK

open Utils
open Amazon.CDK
open Amazon.CDK.AWS.S3

type FSharpCDKStack(scope, id, props) as this =
    inherit Stack(scope, id, props)

    let expireAfter30Days =
      LifecycleRule(Enabled = Utils.nl true,
                    Expiration = Duration.Days(30.0))

    let bucketProps =
      BucketProps(Versioned = Utils.nl true,

                  LifecycleRules = [| expireAfter30Days |],

                  PublicReadAccess = Utils.nl false,
                  BlockPublicAccess = BlockPublicAccess.BLOCK_ALL,

                  RemovalPolicy = Utils.nl RemovalPolicy.DESTROY)

    do

      Bucket(this, "TestBucketFromFSharp", bucketProps) |> ignore

      ()
