import { Controller, Get, Post, Body, Patch, Param, Delete,UsePipes,ValidationPipe,UseGuards, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto,@Req() req) {
    console.log('controller')
    return this.transactionService.create(
      createTransactionDto,
      +req.user.id,);
  }
  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req,@Param('type') type:string){

    return this.transactionService.findAllByType(+req.user.id,type);

  }
  
  @Get('pagination')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page:string,
    @Query('limit') limit:string 
    ){

    return this.transactionService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard,AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard,AuthorGuard)
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard,AuthorGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

  
}
