<?php

namespace App\Tables\Services;
use Illuminate\Support\Str;

class QueryBuilder {


    public function apply($query, $data)
    {
        if(isset($data['post_http'])) {
            foreach($data['init'] as $filter) {
                $query->where($filter['post_column'], '=', $filter['post_params']);
            }
        }

        if(isset($data['f'])) {
            foreach($data['f'] as $filter) {
                $filter['match'] = isset($filter['filter_match']) ? $ $filter['filter_match'] : 'and';
                $this->makeFilter($query, $filter);
            }
        }elseif (isset($data['w_term']) && isset($data['w_columns']) ) {
            $term     = $data['w_term'];
            $columns  = $data['w_columns'];
            $this->wordsSearch($query, $columns, $term);
        }

        return $query;
    }

    protected function makeFilter($query, $filter)
    {
        $function = Str::camel($filter['operator']);
        $this->{$function}($filter, $query);
    }


    public function wordsSearch($query, $columns, $term)
    {
        $words_search = explode(" ",$term);

        return $query->where(function ($query) use ($columns,$words_search) {
            foreach ($words_search as $word) {
                $query = $query->where(function ($query) use ($columns,$word) {
                    foreach ($columns as $column) {
                        $query->orWhere($column,'like',"%$word%");
                    }
                });
            }
        });


    }




    //functions string and numeric


    public function equalTo($filter, $query)
    {
        return $query->where($filter['column'], '=', $filter['query_1'], $filter['match']);
    }

    public function notEqualTo($filter, $query)
    {
        return $query->where($filter['column'], '<>', $filter['query_1'], $filter['match']);
    }

    public function lessEqualTo($filter, $query)
    {
        return $query->where($filter['column'], '<=', $filter['query_1'], $filter['match']);
    }

    public function greaterEqualTo($filter, $query)
    {
        return $query->where($filter['column'], '>=', $filter['query_1'], $filter['match']);
    }

    public function between($filter, $query)
    {
        return $query->whereBetween($filter['column'], [
            $filter['query_1'], $filter['query_2']
        ], $filter['match']);
    }

    public function notBetween($filter, $query)
    {
        return $query->whereNotBetween($filter['column'], [
            $filter['query_1'], $filter['query_2']
        ], $filter['match']);
    }

    public function contains($filter, $query)
    {
        return $query->where($filter['column'], 'like', '%'.$filter['query_1'].'%', $filter['match']);
    }

    public function startsWith($filter, $query)
    {
        return $query->where($filter['column'], 'like', $filter['query_1'].'%', $filter['match']);
    }

    public function endsWith($filter, $query)
    {
        return $query->where($filter['column'], 'like', '%'.$filter['query_1'], $filter['match']);
    }





    // function date    -------------------------------------------------------------------------------

    public function equalToTheDateOf($filter, $query)
    {
        return $query->whereDate($filter['column'], '=', $filter['query_1'], $filter['match']);
    }



    public function notEqualToTheDateOf($filter, $query)
    {
        return $query->whereDate($filter['column'], '<>', $filter['query_1'], $filter['match']);
    }


    public function beforeOrEqualToTheDate($filter, $query)
    {
        return $query->whereDate($filter['column'], '<=', $filter['query_1'], $filter['match']);
    }

    public function afterOrEqualToTheDate($filter, $query)
    {
        return $query->whereDate($filter['column'], '>=', $filter['query_1'], $filter['match']);
    }



    public function betweenDates($filter, $query)
    {
        $startDate = date($filter['query_1'] . ' 00:00:00', time());
        $endDate   = date($filter['query_2'] . ' 23:59:59', time());

        return $query->whereBetween($filter['column'],
            [ $startDate , $endDate ], $filter['match']
        );
    }

    public function notBetweenTheDates($filter, $query)
    {
        $startDate = date($filter['query_1'] . ' 00:00:00', time());
        $endDate   = date($filter['query_2'] . ' 23:59:59', time());

        return $query->whereNotBetween($filter['column'],
            [ $startDate , $endDate ], $filter['match']
        );
    }





}
