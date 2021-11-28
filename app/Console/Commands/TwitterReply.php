<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use TwitterAPIExchange;

class TwitterReply extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'twitter:reply';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $settings = array(
            'oauth_access_token' => "50889606-QNhUxBfrxQVwrQtKe1qIkgSQM75p4ul7WTOJ9qS2c",
            'oauth_access_token_secret' => "BeSjRRDDmC5pvlXQDUyRSRskDBHwuG5curdFf7YorHFee",
            'consumer_key' => "3aPKJ59FnrMfyNRVk1ONetGn9",
            'consumer_secret' => "v2Jl9WolTieFuErRaUT6TAhgJ9UBn5j9Mj2bbDDRkdXZAjBySy"
        );
        
        $url = 'https://api.twitter.com/1.1/statuses/update.json';
        $requestMethod = 'POST';
        $postfields = array(
            'status' => '@tjinwendycarlo @atr_bpn Semoga permasalahan nya bisa segera diselesaikan ya kak', 
            'in_reply_to_status_id' => '1464817239555653633'
        );

        $twitter = new TwitterAPIExchange($settings);
        $response = $twitter->setPostfields($postfields)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        echo print_r(json_decode($response));
    }
}
