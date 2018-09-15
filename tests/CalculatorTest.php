<?php

require 'Calculator.php';

use PHPUnit\Framework\TestCase;

class CalculatorTests extends TestCase
{
    protected function setUp()
    {
        $this->calculator = new Calculator();
    }

    protected function tearDown()
    {
        $this->calculator = NULL;
    }

    /**
     *  @dataProvider provideAdd
     */
    public function testAdd($numbers, $expected)
    {
        $result = $this->calculator->add($numbers[0], $numbers[1]);
        $this->assertEquals($expected, $result);
    }

    public function provideAdd()
    {
        return [[[1, 2], 3],
                [[5, 6], 11],
                [[125, 500], 625]];
    }

    public function testSubtract()
    {
        $result = $this->calculator->subtract(5, 6);
        $this->assertEquals(-1, $result);
    }

    public function testMultiply()
    {
        $result = $this->calculator->multiply(3, 9);
        $this->assertEquals(27, $result);
    }
    
    public function testDivide()
    {
        $result = $this->calculator->divide(10, 5);
        $this->assertEquals(2, $result);
    }

}