<?php

namespace App\Tables\Traits;

use Illuminate\Validation\ValidationException;


use App\Tables\Services\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;




trait TableData
{

    private $query;
    //private Builder $query;

    public function __construct()
    {
        $this->query = $this->query();
    }

    public function advancedFilters()
    {
        return $this->process($this->query, request()->all())
            ->orderBy(
                request('order_column', 'id'),
                request('order_direction', 'desc')
            )
            ->paginate(request('limit', 10));
    }

    public function process($query, $data)
    {
        $validator = validator()->make($data, [
            'order_column' => 'sometimes|required|in:'.$this->orderableColumns(),
            'order_direction' => 'sometimes|required|in:asc,desc',

            'limit' => 'sometimes|required|integer|min:1',
            //post
            'post_http' => 'sometimes|required|in:true,false',
            'init' => 'sometimes|required|array',
            'init.*.post_column' => 'required|in:'.$this->whiteListColumns(),
            'init.*.post_params' => 'required',

            //words_search
            'w_term' => 'sometimes|required|string|min:1',
            'w_operator' => 'sometimes|required|in:'.$this->allowedOperators(),
            'w_columns' => 'sometimes|required|array',
            'w_columns.*' => 'required|in:'.$this->whiteListColumns(),
            // advanced filter
            'filter_match' => 'sometimes|required|in:and,or',
            'f' => 'sometimes|required|array',
            'f.*.column' => 'required|in:'.$this->whiteListColumns(),
            'f.*.operator' => 'required_with:f.*.column|in:'.$this->allowedOperators(),
            'f.*.query_1' => 'required',
            'f.*.query_2' => 'required_if:f.*.operator,between,not_between'
        ]);


        if($validator->fails()) {
            // debug
            //$errors = $validator->errors();
            //dd($validator->messages()->all());
            //return dd($validator->errors());



            dd($validator->messages()->all());


            throw new ValidationException;


        }
        return (new QueryBuilder)->apply($query, $data);
    }

    protected function whiteListColumns()
    {
        return implode(',', $this->allowedFilters);
    }

    protected function orderableColumns()
    {
        return implode(',', $this->orderable);
    }

    protected function allowedOperators()
    {
        return implode(',', [
            'equal_to',
            'not_equal_to',
            'less_equal_to', //menor igual
            'greater_equal_to', //mayor igual
            'between',
            'not_between',
            'contains',
            'starts_with',
            'ends_with',
            //date
            'equal_to_the_date_of',//=
            'not_equal_to_the_date_of',//<>
            'before_or_equal_to_the_date', //<=
            'after_or_equal_to_the_date',//>=
            'between_dates',
            'not_between_the_dates',

            //all
            'words_search'

        ]);
    }







































}
