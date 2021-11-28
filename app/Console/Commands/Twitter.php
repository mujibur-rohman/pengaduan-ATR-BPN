<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use TwitterAPIExchange;

class Twitter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'twitter:get';

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
    public function handle() {
        $settings = array(
            'oauth_access_token' => "50889606-QNhUxBfrxQVwrQtKe1qIkgSQM75p4ul7WTOJ9qS2c",
            'oauth_access_token_secret' => "BeSjRRDDmC5pvlXQDUyRSRskDBHwuG5curdFf7YorHFee",
            'consumer_key' => "3aPKJ59FnrMfyNRVk1ONetGn9",
            'consumer_secret' => "v2Jl9WolTieFuErRaUT6TAhgJ9UBn5j9Mj2bbDDRkdXZAjBySy"
        );
        
        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $getfield = '?q=#tanyaatrbpn&count=2';
        $requestMethod = 'GET';

        $twitter = new TwitterAPIExchange($settings);
        $response = $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        $json = json_decode($response);
        
        if (isset($json->statuses)) {
            $count = count($json->statuses);
            $data = [];
            foreach($json->statuses as $row) {
                $entities = $row->entities;
                $urls = null;
                if (isset($entities->urls) && !empty($entities->urls[0])) {
                    $urls = $entities->urls[0]->url;
                }
                
                $user_d = $row->user;
                $user = [
                    'name' => $user_d->name,
                    'screen_name' => $user_d->screen_name,
                    'location' => $user_d->location,
                    'url' => $user_d->url
                ];
                
                $data[] = [
                    'id' => $row->id,
                    'text' => $row->text,
                    'created_at' => $row->created_at,
                    'user' => $user,
                    'url' => $urls
                ];
            }
            echo "Count: " . $count . "\n";
            echo print_r($data, true);
        } else {
            echo "unset \n";
        }
    }
}